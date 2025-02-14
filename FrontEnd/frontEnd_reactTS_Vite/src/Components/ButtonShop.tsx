import { Button } from "react-bootstrap";

export default function ButtonShop({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
    return(
        <Button
            onClick={onClick }
            variant="outline-secondary"
            className="text-center px-4 py-2 rounded-pill shop-button"
        >{children}</Button>
    );
}
