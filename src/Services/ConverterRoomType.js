export function converterRoomType(roomType) {
    switch (roomType) {
        case 1:
            return 'Standart';

        case 2:
            return 'DeLuxe';

        case 3:
            return 'FamilyRoom';

        case 4:
            return 'Apartament';

        default:
            return '';
    }
}
