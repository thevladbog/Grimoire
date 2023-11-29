import { ArraySpec } from '@gravity-ui/dynamic-forms/build/esm/lib/core/types';
import { SpecTypes } from '@gravity-ui/dynamic-forms';

export const EquipmentConfig: ArraySpec = {
  type: SpecTypes.Array,
  items: {
    type: SpecTypes.Object,
    properties: {
      type: {
        type: SpecTypes.Array,
        enum: [
          'standardLaptopWindows',
          'standardLaptopMacOs',
          'standardLaptopLinuxEmpty',
          'highLaptopWindows',
          'highLaptopMacOs',
          'highLaptopLinuxEmpty',
        ],
        description: {
          standardLaptopWindows: 'Standard Laptop (Windows)',
          standardLaptopMacOs: 'Standard Laptop (MacOS)',
          standardLaptopLinuxEmpty: 'Standard Laptop (Linux/Empty)',
          highLaptopWindows: 'High-Performance Laptop (Windows)',
          highLaptopMacOs: 'High-Performance (MacOS)',
          highLaptopLinuxEmpty: 'High-Performance (Linux/Empty)',
        },
        viewSpec: {
          type: 'select',
          layout: 'table_item',
        },
        items: {
          viewSpec: { type: '' },
          type: SpecTypes.String,
        },
        required: true,
      },
      qty: {
        type: SpecTypes.Number,
        viewSpec: {
          type: 'base',
          layout: 'table_item',
          disabled: false,
          placeholder: '1',
        },
        required: true,
        maximum: 3,
        minimum: 1,
        format: undefined,
        validator: 'base',
      },
      comment: {
        viewSpec: {
          type: 'textarea',
          layout: 'table_item',
          layoutTitle: '',
          layoutDescription: '',
          placeholder:
            'Please type business justification or another helpful information',
          copy: true,
        },
        validator: '―',
        enum: undefined,
        required: false,
        type: SpecTypes.String,
      },
    },
    viewSpec: {
      type: '',
    },
    required: true,
  },
  viewSpec: {
    type: 'table',
    layout: 'card_section',
    layoutTitle: 'Equipment',
    layoutOpen: true,
    itemLabel: 'Add',
    table: [
      {
        label: 'Type',
        property: 'type',
      },
      {
        property: 'qty',
        label: 'Qty',
      },
      {
        property: 'comment',
        label: 'Comment',
      },
    ],
    layoutDescription: 'Please select necessary equipment for new employee',
  },
  required: true,
};

export enum EquipmentOptions {
  standardLaptopWindows = 'Standard Laptop (Windows)',
  standardLaptopMacOS = 'Standard Laptop (MacOS)',
  standardLaptopLinux = 'Standard Laptop (Linux/Empty)'
}