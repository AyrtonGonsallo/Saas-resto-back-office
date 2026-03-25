import { Component } from '@angular/core';

import { BasicInputGroups } from './basic-input-groups/basic-input-groups';
import { ButtonAddons } from './button-addons/button-addons';
import { ButtonsDropdowns } from './buttons-dropdowns/buttons-dropdowns';
import { CheckboxesAndRadios } from './checkboxes-and-radios/checkboxes-and-radios';
import { CustomFileInput } from './custom-file-input/custom-file-input';
import { CustomForms } from './custom-forms/custom-forms';
import { InputGroupsSizing } from './input-groups-sizing/input-groups-sizing';
import { MultipleInputs } from './multiple-inputs/multiple-inputs';
import { SegmentedButtons } from './segmented-buttons/segmented-buttons';
import { VariationAddons } from './variation-addons/variation-addons';

@Component({
  selector: 'app-input-group',
  imports: [
    BasicInputGroups,
    ButtonAddons,
    ButtonsDropdowns,
    CheckboxesAndRadios,
    CustomFileInput,
    CustomForms,
    InputGroupsSizing,
    SegmentedButtons,
    VariationAddons,
    MultipleInputs,
  ],
  templateUrl: './input-group.html',
  styleUrl: './input-group.scss',
})
export class InputGroup {}
