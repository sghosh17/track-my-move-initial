const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const formSchema = new Schema({
  formName: {
    type: String,
    required: true,
  },
  notes: [
    {
      noteText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      noteAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
  checkboxes: [
    {
      checkboxName: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        required: true,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Form = model("Form", formSchema);

module.exports = Form;
