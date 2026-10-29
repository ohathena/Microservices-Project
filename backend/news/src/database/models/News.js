const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    summary: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      required: true,
      enum: ['VideoCardz', "Tom's Hardware", 'PC Gamer', 'Wccftech', 'Ars Technica', 'General Tech'],
      default: 'General Tech',
    },
    sourceUrl: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    },
    category: {
      type: String,
      enum: ['GPU', 'CPU', 'Monitors', 'Gaming PCs', 'Components', 'Industry'],
      default: 'Components',
      index: true,
    },
    author: {
      type: String,
      default: 'Hardware Staff',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('News', NewsSchema);
