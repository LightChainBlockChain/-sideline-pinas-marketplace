const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'nft',
      'digital_art',
      'software',
      'ebook',
      'music',
      'video',
      'photography',
      'templates',
      'courses',
      'other'
    ]
  },
  subcategory: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pricing: {
    type: {
      type: String,
      enum: ['fixed', 'auction', 'negotiable'],
      default: 'fixed'
    },
    basePrice: {
      type: Number,
      required: [true, 'Base price is required'],
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      enum: ['PHP', 'USD'],
      default: 'PHP'
    },
    reservePrice: {
      type: Number,
      min: [0, 'Reserve price cannot be negative']
    },
    buyNowPrice: {
      type: Number,
      min: [0, 'Buy now price cannot be negative']
    }
  },
  auction: {
    isAuction: {
      type: Boolean,
      default: false
    },
    startDate: Date,
    endDate: Date,
    currentBid: {
      type: Number,
      default: 0
    },
    currentBidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    totalBids: {
      type: Number,
      default: 0
    },
    minimumBidIncrement: {
      type: Number,
      default: 10
    }
  },
  files: [{
    name: String,
    url: String,
    type: {
      type: String,
      enum: ['image', 'video', 'audio', 'document', 'archive', 'other']
    },
    size: Number,
    mimeType: String,
    isPreview: {
      type: Boolean,
      default: false
    }
  }],
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  specifications: {
    format: String,
    dimensions: String,
    fileSize: String,
    software: String,
    compatibility: [String],
    license: {
      type: String,
      enum: ['commercial', 'personal', 'extended', 'exclusive'],
      default: 'personal'
    }
  },
  nft: {
    isNFT: {
      type: Boolean,
      default: false
    },
    tokenId: String,
    contractAddress: String,
    blockchain: {
      type: String,
      enum: ['ethereum', 'polygon', 'binance'],
      default: 'polygon'
    },
    metadataUrl: String,
    attributes: [{
      trait_type: String,
      value: String
    }],
    royalties: {
      percentage: {
        type: Number,
        min: 0,
        max: 50,
        default: 10
      },
      recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'sold', 'expired', 'suspended', 'deleted'],
    default: 'draft'
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'unlisted'],
    default: 'public'
  },
  featured: {
    type: Boolean,
    default: false
  },
  statistics: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    },
    downloads: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  reportedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  publishedAt: Date,
  expiresAt: Date
}, {
  timestamps: true
});

// Indexes for performance
productSchema.index({ seller: 1 });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ status: 1, visibility: 1 });
productSchema.index({ 'auction.endDate': 1 });
productSchema.index({ 'pricing.basePrice': 1 });
productSchema.index({ tags: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ 'statistics.views': -1 });

// Text search index
productSchema.index({
  title: 'text',
  description: 'text',
  tags: 'text'
});

// Virtual for time remaining in auction
productSchema.virtual('timeRemaining').get(function() {
  if (!this.auction.isAuction || !this.auction.endDate) return null;
  
  const now = new Date();
  const endDate = new Date(this.auction.endDate);
  const diff = endDate - now;
  
  if (diff <= 0) return 0;
  
  return Math.floor(diff / 1000); // Return seconds remaining
});

// Check if auction is active
productSchema.virtual('isAuctionActive').get(function() {
  if (!this.auction.isAuction) return false;
  
  const now = new Date();
  const startDate = new Date(this.auction.startDate);
  const endDate = new Date(this.auction.endDate);
  
  return now >= startDate && now <= endDate;
});

// Pre-save middleware
productSchema.pre('save', function(next) {
  // Set published date when status changes to active
  if (this.isModified('status') && this.status === 'active' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  // Calculate average rating
  if (this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = totalRating / this.reviews.length;
    this.totalReviews = this.reviews.length;
  }
  
  next();
});

// Static method to get trending products
productSchema.statics.getTrending = function(limit = 10) {
  return this.find({
    status: 'active',
    visibility: 'public'
  })
  .sort({
    'statistics.views': -1,
    'statistics.likes': -1,
    createdAt: -1
  })
  .limit(limit)
  .populate('seller', 'username profile.firstName profile.lastName profile.avatar');
};

// Static method to get featured products
productSchema.statics.getFeatured = function(limit = 10) {
  return this.find({
    status: 'active',
    visibility: 'public',
    featured: true
  })
  .sort({ createdAt: -1 })
  .limit(limit)
  .populate('seller', 'username profile.firstName profile.lastName profile.avatar');
};

// Ensure virtuals are included in JSON
productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
