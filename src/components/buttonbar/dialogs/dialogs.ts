import { openDialog } from 'vue3-promise-dialog';
import ArchiveConfirmationDialogue from './ArchiveConfirmationDialogue.vue';

export async function confirm(confirmationQuestion: string,btnMessageOK:string,btnMessageCancel:string) {
    return await openDialog(ArchiveConfirmationDialogue, {confirmationQuestion,btnMessageOK,btnMessageCancel});
}