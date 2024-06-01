import { RegisterOptions, ValidationRule } from "react-hook-form";

const patterns: {
  [key: string]: ValidationRule<RegExp>;
} = {
  trimAndOneSpaceBetween: {
    value: /^(?!\s)(?!.*\s\s).*(?<!\s)$/gu,
    message: 'Without space at the start and end, one space between',
  },
};

export const validation: {
  // adminAction?: RegisterOptions;
  id?: RegisterOptions;
  name?: RegisterOptions;
  categoryId?: RegisterOptions;
  price?: RegisterOptions;
  country?: RegisterOptions;
  producer?: RegisterOptions;
  collection?: RegisterOptions;
  type?: RegisterOptions;
  code?: RegisterOptions;
  tone?: RegisterOptions;
  room?: RegisterOptions;
  description?: RegisterOptions;
  imageUrl?: RegisterOptions;
} = {
  // adminAction: {
  //   required: 'select the action'
  // },

  id: {
    // pattern: {
    //   value: /^\d+$/u,
    //   message: `Write correct (^\d+$)`,
    // },
    valueAsNumber: true,
    maxLength: {
      value: 20,
      message: 'It is too long!',
    },
  },

  name: {
    pattern: patterns.trimAndOneSpaceBetween,
  },

  categoryId: {
    required: 'required',
    // pattern: {
    //   value: /^\S?[\d]+\S?$/,
    //   message: `Write correct (^\S?[\d]+\S?$)`,
    // },
    valueAsNumber: true,
    maxLength: {
      value: 2,
      message: 'It is too long!',
    },
  },

  price: {
    required: 'required',
    pattern: {
      value: /^\d+$/g,
      message: `Write correct (^\d+$/g)`,
    },
    // valueAsNumber: true,
    maxLength: {
      value: 10,
      message: 'It is too long!',
    },
  },

  country: {
    pattern: patterns.trimAndOneSpaceBetween,
  },

  producer: {
    pattern: patterns.trimAndOneSpaceBetween,
  },

  collection: {
    pattern: patterns.trimAndOneSpaceBetween,
  },

  type: {
    pattern: patterns.trimAndOneSpaceBetween,
  },

  description: {
    maxLength: {
      value: 2048,
      message: 'It is too long!',
    },
  },

};
