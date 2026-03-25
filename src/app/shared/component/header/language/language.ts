import { Component, inject } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { NavmenuService } from '../../../../shared/services/navmenu.service';

interface selectedlanguage {
  language?: string;
  code: string;
  type?: string;
  icon?: string;
}

@Component({
  selector: 'app-language',
  imports: [],
  templateUrl: './language.html',
  styleUrl: './language.scss',
})
export class Language {
  public language: boolean = false;

  public languages: selectedlanguage[] = [
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: 'us',
    },
    {
      language: 'Español',
      code: 'es',
      icon: 'es',
    },
    {
      language: 'Français',
      code: 'fr',
      icon: 'fr',
    },
    {
      language: 'Português',
      code: 'pt',
      type: 'BR',
      icon: 'pt',
    },
  ];

  public selectedLanguage: selectedlanguage = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us',
  };

  public navServices: NavmenuService = inject(NavmenuService);
  private translate: TranslateService = inject(TranslateService);

  changeLanguage(lang: selectedlanguage) {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }
}
