import mongoose from 'mongoose';
import escape from 'escape-html';

export default class SchemaWithEscapedFields extends mongoose.Schema {
  constructor(definition, escapedFieldNames) {
    super(definition);

    this.pre(['save', 'findOneAndUpdate'], function escapeSpecialCharacters(next) {
      if (this._update) {
        escapedFieldNames.forEach((name) => {
          if (this._update.$set && this._update.$set[name]) {
            this._update.$set[name] = escape(this._update.$set[name]);
          }
        });
      } else {
        escapedFieldNames.forEach((name) => {
          this[name] = escape(this[name]);
        });
      }
      next();
    });
  }
}
