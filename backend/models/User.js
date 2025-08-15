const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  profile: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    avatar: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
      default: ''
    },
    location: {
      city: String,
      province: String,
      country: {
        type: String,
        default: 'Philippines'
      }
    },
    phoneNumber: {
      type: String,
      match: [/^(\+639|09)\d{9}$/, 'Please provide a valid Philippine phone number']
    },
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer_not_to_say'],
      default: 'prefer_not_to_say'
    }
  },
  role: {
    type: String,
    enum: ['sideline', 'admin', 'moderator'],
    default: 'sideline'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  preferences: {
    language: {
      type: String,
      enum: ['en', 'fil', 'tl'],
      default: 'en'
    },
    currency: {
      type: String,
      enum: ['PHP', 'USD'],
      default: 'PHP'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      },
      push: {
        type: Boolean,
        default: true
      }
    }
  },
  wallet: {
    address: String,
    balance: {
      type: Number,
      default: 0
    },
    escrowBalance: {
      type: Number,
      default: 0
    },
    // Optional on-platform token balance (e.g., Veri tokens)
    tokenBalance: {
      type: Number,
      default: 0
    }
  },
  // Early user rewards and discounts
  rewards: {
    signupTokensAwarded: {
      type: Number,
      default: 0
    },
    awardedAt: Date,
    reason: String
  },
  discount: {
    eligible: {
      type: Boolean,
      default: false
    },
    rate: {
      type: Number,
      default: 0, // e.g., 0.2 = 20% discount on platform commission
      min: 0,
      max: 1
    },
    awardedAt: Date,
    expiresAt: Date
  },
  paymentMethods: [{
    type: {
      type: String,
      enum: ['gcash', 'paymaya', 'unionbank', 'bpi', 'metrobank', 'card'],
      required: true
    },
    accountNumber: String,
    accountName: String,
    isDefault: {
      type: Boolean,
      default: false
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  }],
  statistics: {
    totalSales: {
      type: Number,
      default: 0
    },
    totalPurchases: {
      type: Number,
      default: 0
    },
    totalEarnings: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalRatings: {
      type: Number,
      default: 0
    }
  },
  lastLogin: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailVerificationToken: String,
  emailVerificationExpire: Date
}, {
  timestamps: true
});

// Index for search optimization
userSchema.index({ username: 1, email: 1 });
userSchema.index({ 'profile.firstName': 1, 'profile.lastName': 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get full name
userSchema.virtual('fullName').get(function() {
  return `${this.profile.firstName} ${this.profile.lastName}`;
});

// Get user display name
userSchema.virtual('displayName').get(function() {
  return this.profile.firstName || this.username;
});

// Ensure virtuals are included in JSON
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
