import mongoose from 'mongoose';
const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  issueDate: { type: Date, required: true }, dueDate: { type: Date, required: true }, returnDate: Date,
  status: { type: String, enum: ['Issued', 'Returned'], default: 'Issued' }
}, { timestamps: true });
export default mongoose.model('Transaction', transactionSchema);
