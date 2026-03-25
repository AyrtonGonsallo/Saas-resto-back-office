import { Component } from '@angular/core';

import { Animated } from './animated/animated';
import { BadgeHeadings } from './badge-headings/badge-headings';
import { BadgesButtons } from './badges-buttons/badges-buttons';
import { Center } from './center/center';
import { CommonBadgePills } from './common-badge-pills/common-badge-pills';
import { TouchspinBadges } from './touchspin-badges/touchspin-badges';
import * as data from '../../../shared/data/ui-kits/tag-pills';

@Component({
  selector: 'app-tag-pills',
  imports: [Animated, BadgeHeadings, BadgesButtons, Center, CommonBadgePills, TouchspinBadges],
  templateUrl: './tag-pills.html',
  styleUrl: './tag-pills.scss',
})
export class TagPills {
  public BadgesData = data.buttons;
  public PillsData = data.pills;
  public NumberBadgeData = data.NumberBadge;
  public NumberPillsData = data.NumberPillstag;
  public IconBadeData = data.iconbadge;
  public IconpillsData = data.iconpills;
}
