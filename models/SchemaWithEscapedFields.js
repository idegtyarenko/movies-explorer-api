import mongoose from 'mongoose';
import escape from 'escape-html';

export default class SchemaWithEscapedFields extends mongoose.Schema {
  constructor(definition, escapedFieldNames) {
    super(definition);
    this.pre('save', function escapeSpecialCharactersOnSave(next) {
      escapedFieldNames.forEach((name) => {
        this[name] = escape(this[name]);
      });
      next();
    });
    this.pre('findOneAndUpdate', function escapeSpecialCharactersOnUpdate(next) {
      escapedFieldNames.forEach((name) => {
        if (this._update[name]) {
          this._update[name] = escape(this._update[name]);
        }
      });
      next();
    });
  }
}
