import { WatchedList } from '@/core/entities'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities'

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
    compareItems (a: QuestionAttachment, b: QuestionAttachment): boolean {
        return a.attachmentId === b.attachmentId
    }
}
