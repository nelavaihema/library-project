import mongoose from 'mongoose';
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true }, author: { type: String, required: true, trim: true },
  isbn: { type: String, required: true, unique: true, trim: true }, category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: String, publishedYear: { type: Number, min: 0 }, totalQuantity: { type: Number, required: true, min: 1 },
  availableQuantity: { type: Number, required: true, min: 0 }, image: String
}, { timestamps: true });
export default mongoose.model('Book', bookSchema);
