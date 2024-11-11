import React from 'react';
import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';
import styled from 'styled-components';

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StarIcon = styled.span`
  color: gold;  // Make stars golden
  font-size: 1.5rem;  // Optional: Adjust size of stars
  margin-right: 0.2rem;  // Optional: Space between stars
`;

const ReviewText = styled.span`
    color: ${({theme})=> theme.colors.textPrimary};
    position: relative;
    top: 3px;
`

const Rating = ({ value, text }) => {
  // Calculate the number of full stars, half stars, and empty stars
  const fullStars = Math.floor(value);
  const halfStars = value % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <RatingWrapper>
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon key={index}><FaStar /></StarIcon>
      ))}
      
      {/* Render half star if needed */}
      {halfStars > 0 && <StarIcon><FaStarHalf /></StarIcon>}
      
      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <StarIcon key={index}><FaRegStar /></StarIcon>
      ))}
      
      {/* Optional text */}
      {text && <ReviewText style={{ marginLeft: '0.5rem' }}>{text} Reviews</ReviewText>}
    </RatingWrapper>
  );
}

export default Rating;
