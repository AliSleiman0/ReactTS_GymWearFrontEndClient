import { useWishlist } from '../Context/WishlistContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';


export const WishlistButton = ({ id }: { id: number }) => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(id);

    const handleClick = () => {
        if (isWishlisted) {
            removeFromWishlist(id);
        } else {
            addToWishlist(id);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
            <FontAwesomeIcon icon={isWishlisted ? solidHeart : regularHeart} />
        </button>
    );
};