import logoImg from '../../assets/logo.svg';

import styled from 'styled-components';
import { Container, Content } from './styles';


export function Header() {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button">
          New Transaction
        </button>
      </Content>

    </Container>
  );
}