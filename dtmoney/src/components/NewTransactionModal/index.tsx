import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/closebutton.svg';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import React, { useContext, useState } from 'react';
import { api } from '../../services/api';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewTransactionModal = ({ isOpen, onRequestClose }: NewTransactionModalProps) => {
  const {createTransaction} = useTransactions();
  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');

  const handleCreateNewTransaction = async (event: React.FormEvent) => {
    event.preventDefault();

    await createTransaction(
      {
        title, amount: value, category, type
      }
    );

    setTitle('');
    setCategory('');
    setType('deposit');
    setValue(0);
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content">

      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Close Modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transacao</h2>
        <input type="text" placeholder="Title" value={title} onChange={(evt) => setTitle(evt.target.value)} />
        <input type="number" placeholder="Value" value={value} onChange={(evt) => setValue(Number(evt.target.value))} />

        <TransactionTypeContainer>
          <RadioBox 
            onClick={() => setType('deposit')}
            isActive={type==='deposit'}
            type="button"
            activeColor="green"
            >
            <img src={income} alt="Income" />
            <span>Income</span>
          </RadioBox>
          <RadioBox 
            onClick={() => setType('withdraw')}
            isActive={type==='withdraw'}
            type="button"
            activeColor="red"
            >
            <img src={outcome} alt="Outcome" />
            <span>Outcome</span>
          </RadioBox>
        </TransactionTypeContainer>


        <input type="text" placeholder="Category" value={category} onChange={(evt) => setCategory(evt.target.value)} />
        <button type="submit">Add</button>
      </Container>

    </Modal>
  );
}