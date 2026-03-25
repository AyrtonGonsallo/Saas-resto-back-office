import { Component } from '@angular/core';

import { BalanceModal } from './balance-modal/balance-modal';
import { ProfileModal } from './profile-modal/profile-modal';
import { ResultModal } from './result-modal/result-modal';

@Component({
  selector: 'app-custom-modals',
  imports: [BalanceModal, ProfileModal, ResultModal],
  templateUrl: './custom-modals.html',
  styleUrl: './custom-modals.scss',
})
export class CustomModals {}
