import { Schema, model } from "mongoose";

interface Service {
  uid: Schema.Types.ObjectId;
  title: string;
  value: string;
  children?: object[];
  tagColor: string;
  isDeleted: boolean;
}

const ServiceSchema = new Schema<Service>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    value: {
      type: String,
    },
    children: {
      type: [Object],
    },
    tagColor: {
      type: String,
      default: Math.floor(Math.random() * 16777215).toString(16),
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ServiceSchema.pre("find", function () {
  this.where({ isDeleted: false });
});

ServiceSchema.pre("findOne", function () {
  this.where({ isDeleted: false });
});

ServiceSchema.methods.toJSON = function () {
  const { __v, _id, ...service } = this.toObject();
  service.id = _id;
  return service;
};

export const Service = model("Service", ServiceSchema);
