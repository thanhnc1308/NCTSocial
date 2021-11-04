import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider';
import { useConversations } from '../contexts/ConversationsProvider';



export default function NewConversationModal(props) {
    const { closeModal } = props;
    const { contacts } = useContacts();
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const { createConversation } = useConversations();

    function handleSubmit(e) {
        e.preventDefault();
        createConversation(selectedContactIds);
        closeModal();
    }

    function handleCheckboxChange(contactId) {
        setSelectedContactIds(prevSelectedContactId => {
            if (prevSelectedContactId.includes(contactId)) {
                return prevSelectedContactId.filter(prevId => prevId !== contactId);
            } else {
                return [...prevSelectedContactId, contactId];
            }
        })
    }

    return (
        <>
         <Modal.Header closeButton>
            Create Conversation
         </Modal.Header>
         <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {contacts.map(contact => (
                    <Form.Group controlId={contact.id} key={contact.id}>
                        <Form.Check
                            type="checkbox"
                            value={selectedContactIds.includes(contact.id)}
                            label={contact.name}
                            onChange={() => handleCheckboxChange(contact.id)}
                        />
                    </Form.Group>
                ))}
                <Button type="submit">Create</Button>
            </Form>
         </Modal.Body>
        </>
    )
}
