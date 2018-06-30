export const OPEN_DROPDOWN = 'OPEN_DROPDOWN';
export const CLOSE_DROPDOWN = 'CLOSE_DROPDOWN';

export function openDropdown(dropdownId) {
    return {
        type: OPEN_DROPDOWN,
        dropdownId: dropdownId
    }
}

export function closeDropdown(dropdownId, selection = null) {
    return {
        type: CLOSE_DROPDOWN,
        dropdownId: dropdownId,
        selection: selection
    }
}