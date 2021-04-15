import { css } from '@emotion/css';

const element = css`
  max-width: 480px;
  width: 100%;
`;

const compare = css`
  position: fixed;
  padding: 10px 8px;
  margin-bottom: 20px;
  font-weight: 700;
  bottom: 0;
`;

const overflowY = css`
  overflow-y: scroll;
  max-height: 400px;
  height: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export { element, compare, overflowY };
