import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';


const Wrapper = styled.article`
  margin:  80px auto 0 auto;
  position: relative;
  z-index: 100;

  transition: 0.3s;
  height: 17rem;
  flex-direction: column;
  justify-content: center;
  max-width: 700px;
  width: calc(99.9% - 1rem);

  &:hover {
    transform: scale(1.01);
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  z-index: 3;
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.7) 80%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: -10;
  }
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  overflow: hidden;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  object-fit: cover;
  > div {
    position: static !important;
  }
  > div > div {
    position: static !important;
  }
`;

const Info = styled.div`
  color: ${props => props.theme.colors.white.base};
  margin: 0 1rem 1.25rem 1.25rem;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Title = styled.h2`
  margin-bottom: 0.6rem;
`;

const PostList = ({ cover, path, date, title, excerpt }) => (
  <Wrapper>
    <Image>
      <Img fluid={cover} />
    </Image>
    <StyledLink to={path}>
      <Info>
        <span>{date}</span>
        <Title>{title}</Title>
        <span>{excerpt}</span>
      </Info>
    </StyledLink>
  </Wrapper>
);

export default PostList;

PostList.propTypes = {
  cover: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
