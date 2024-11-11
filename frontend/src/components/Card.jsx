    import React from "react";
    import { Card } from "react-bootstrap";
    import styled from "styled-components";
    import { Link } from "react-router-dom";
    import Rating from "./Rating";

    const StyledCard = styled(Card)`
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.colors.aloeLight};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid ${({ theme }) => theme.colors.aloeLight};
    transition: transform 0.3s ease, border-color 0.3s ease;

    &:hover {
        transform: scale(1.05);
        border-color: ${({ theme }) => theme.colors.aloeGreen}; /* Optional */
    }
`;

    const StyledCardTitle = styled(Card.Title)`
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 1rem;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  // Add ellipsis when text overflows
    `;

    const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    &:hover {
        color: ${({ theme }) => theme.colors.linkColor};
    }
    `;

    const StyledCardText = styled(Card.Text)`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.5rem;
    margin-top: auto;
    margin-bottom: 0.5rem;
    flex-shrink: 0;
    `;

    const CardComponent = ({ items }) => {
    return (
        <StyledCard>
        <StyledLink to={`/products/${items._id}`}>
            <Card.Img src={items.image} variant="top" alt={`eGadgets-${items._id}`} />
        </StyledLink>
        <Card.Body>
            <StyledLink to={`/products/${items._id}`}>
            <StyledCardTitle as="div">
                <strong>{items.name}</strong>
            </StyledCardTitle>
            </StyledLink>
            <StyledLink to={`/products/${items._id}`}>
            <StyledCardText as="h5">${items.price}</StyledCardText>
            </StyledLink>
            <Rating value={items.rating} text={`${items.numReviews} reviews`} />
        </Card.Body>
        </StyledCard>
    );
    };

    export default CardComponent;
