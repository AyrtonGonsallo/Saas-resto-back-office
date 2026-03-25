import { Component } from '@angular/core';

import { CheckboxLists } from './checkbox-lists/checkbox-lists';
import { ContextualClasses } from './contextual-classes/contextual-classes';
import { CustomContentLists } from './custom-content-lists/custom-content-lists';
import { DefaultLists } from './default-lists/default-lists';
import { DisabledLists } from './disabled-lists/disabled-lists';
import { JavaScriptBehavior } from './java-script-behavior/java-script-behavior';
import { NumbersBadgeLists } from './numbers-badge-lists/numbers-badge-lists';
import { NumbersLists } from './numbers-lists/numbers-lists';
import { RadiosLists } from './radios-lists/radios-lists';
import { ScrollableLists } from './scrollable-lists/scrollable-lists';
import { TopCommonLists } from './top-common-lists/top-common-lists';

@Component({
  selector: 'app-lists',
  imports: [
    CheckboxLists,
    ContextualClasses,
    CustomContentLists,
    DefaultLists,
    DisabledLists,
    JavaScriptBehavior,
    NumbersBadgeLists,
    NumbersLists,
    RadiosLists,
    ScrollableLists,
    TopCommonLists,
  ],
  templateUrl: './lists.html',
  styleUrl: './lists.scss',
})
export class Lists {}
