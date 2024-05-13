import { RegisterOptions } from "react-hook-form";

export const validation: {
  adminAction?: RegisterOptions;
  name?: RegisterOptions;
  categoryId?: RegisterOptions;
  price?: RegisterOptions;
  country?: RegisterOptions;
  producer?: RegisterOptions;
  collection?: RegisterOptions;
  type?: RegisterOptions;
  tone?: RegisterOptions;
  room?: RegisterOptions;
  description?: RegisterOptions;
  imageUrl?: RegisterOptions;
} = {
  adminAction: {
    required: 'select the action'
  },

  name: {
    pattern: {
      value: /^\S?[\p{L}'\s]+\S?$/u,
      message: `Write correct (^\S?[\p{L}'\s]+\S?$)`,
    },
    maxLength: {
      value: 20,
      message: 'It is too long!',
    },
  },

  categoryId: {
    required: 'required',
    pattern: {
      value: /^\S?[\d]+\S?$/,
      message: `Write correct (^\S?[\d]+\S?$)`,
    },
    // valueAsNumber: true,
    maxLength: {
      value: 2,
      message: 'It is too long!',
    },
  },

  price: {
    required: 'required',
    pattern: {
      value: /^\S?[\d]+\S?$/,
      message: `Write correct (^\S?[\d]+\S?$)`,
    },
    // valueAsNumber: true,
    maxLength: {
      value: 10,
      message: 'It is too long!',
    },
  },
};
