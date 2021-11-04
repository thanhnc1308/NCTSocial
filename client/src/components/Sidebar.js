import Button from '@restart/ui/esm/Button';
import React, { useState } from 'react'
import { Tab, Nav, Modal } from 'react-bootstrap'
import Contacts from './Contacts';
import Conversations from './Conversations';
import NewContactModal from './NewContactModal';
import NewConversationModal from './NewConversationModal';

const CONVERSATIONS_KEY = 'conversations';
const CONTACTS_KEY = 'contacts';

export default function Sidebar(props) {
    const { id } = props;
    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
    const [modelOpen, setModelOpen] = useState(false);
    const conversationOpen = activeKey === CONVERSATIONS_KEY;

    function closeModal() {
        setModelOpen(false);
    }

    return (
        <div style={ {width: '250px'} } className="d-flex flex-column" >
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey} >
                <Nav variant="tabs" className="justify-content-center" >
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversations/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts/>
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Your Id: <span className="text-muted"> { id } </span>
                </div>
                <Button onClick={() => setModelOpen(true)} className="rounded-0">
                    New { conversationOpen ? 'Conversation' : 'Contact'}
                </Button>
                <Modal show={modelOpen} onHide={closeModal} >
                    {
                        conversationOpen
                        ? <NewConversationModal closeModal={closeModal} />
                        : <NewContactModal closeModal={closeModal} />
                    }
                </Modal>
            </Tab.Container>
        </div>
    )
}
