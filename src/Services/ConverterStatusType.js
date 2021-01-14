export function converterStatusType(Status) {
    switch (Status) {
        case 1:
            return 'Free';

        case 2:
            return 'Booked';

        case 3:
            return 'Bought';

        default:
            return '';
    }
}
