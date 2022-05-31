import PropTypes from 'prop-types';

export function limitCharacters(description) {
    if(description && description.length > 250) {
        const newDescription = description.substring(0, 250);
        return newDescription.concat('...');
    } else {
        return description;
    }
}

limitCharacters.propTypes = {
    description: PropTypes.string
}