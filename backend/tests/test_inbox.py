from bson import ObjectId
from ..tests import conftest

def test_new_message(client, user_token, mock_db):
    """
    GIVEN a Flask application configured for testing
    WHEN the ('/inbox/new') is posted to (POST)
    THEN check that a '200' (OK) status code is returned
    """
    id = mock_db['UserAccount'].find_one()['_id']
    user_stub = conftest.USER_STUB.copy()
    mock_db['UserAccount'].insert_one(user_stub)
    
    resp = client.post('/inbox/new', headers=user_token, json={
        'recipient': user_stub['_id'],
        'subject': 'Testing Email',
        'body': 'Send help'
    })
    assert resp.status_code == conftest.OK
    
    # checking that message was pushed into recipient's inbox
    user = mock_db['UserAccount'].find_one({'_id': user_stub['_id']})

    message = user['inbox'][0]
    message.pop('_id')
    message.pop('timestamp')

    assert message == {
        'sender': ObjectId(id),
        'recipient': ObjectId(user_stub['_id']),
        'subject': 'Testing Email',
        'body': 'Send help'
    }
    
def test_invalid_recipient(client, user_token, mock_db):
    """
    GIVEN a Flask application configured for testing
    WHEN the ('/inbox/new') is posted to with an invalid recipient (POST)
    THEN check that a '400' (BAD_REQUEST) status code is returned
    """
    resp = client.post('/inbox/new', headers=user_token, json={
        'recipient': 'invalid!',
        'subject': 'Testing Email',
        'body': 'Send help'
    })
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': 'Valid recipient is required'
    }
    
def test_invalid_subject(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the ('/inbox/new') is posted to with an invalid subject line (POST)
    THEN check that a '400' (BAD_REQUEST) status code is returned
    """
    resp = client.post('/inbox/new', headers=user_token, json={
        'recipient': conftest.TEST_UID,
        'subject': '',
        'body': 'Send help'
    })
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': 'Subject line is required'
    }
    
def test_invalid_body(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the ('/inbox/new') is posted to with an invalid body (POST)
    THEN check that a '400' (BAD_REQUEST) status code is returned
    """
    resp = client.post('/inbox/new', headers=user_token, json={
        'recipient': conftest.TEST_UID,
        'subject': 'Send help',
        'body': ''
    })
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': 'Message body is required'
    }
    
def test_missing_subject(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the ('/inbox/new') is posted to with an missing subject line (POST)
    THEN check that a '400' (BAD_REQUEST) status code is returned
    """
    resp = client.post('/inbox/new', headers=user_token, json={
        'recipient': conftest.TEST_UID,
        'body': 'Send help'
    })
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': 'Subject line is required'
    }

def test_missing_body(client, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the ('/inbox/new') is posted to with an invalid body (POST)
    THEN check that a '400' (BAD_REQUEST) status code is returned
    """
    resp = client.post('/inbox/new', headers=user_token, json={
        'recipient': conftest.TEST_UID,
        'subject': 'Send help',
    })
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': 'Message body is required'
    }

################################### SPECIFIC ###################################

def test_get_specific_message(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the ('/inbox/<message_id>') is requested for (GET)
    THEN check that a '200' (OK) status code is returned
    """
    id = mock_db['UserAccount'].find_one()['_id']
    user_stub = conftest.USER_STUB.copy()
    mock_db['UserAccount'].insert_one(user_stub)
    
    resp = client.post('/inbox/new', headers=user_token, json={
        'recipient': user_stub['_id'],
        'subject': 'Testing Email',
        'body': 'Send help'
    })
    assert resp.status_code == conftest.OK
    
    # checking that message was pushed into recipient's inbox
    user = mock_db['UserAccount'].find_one({'_id': user_stub['_id']})

    message = user['inbox'][0]
    message_id = message.pop('_id')
    message.pop('timestamp')

    assert message == {
        'sender': id,
        'recipient': ObjectId(user_stub['_id']),
        'subject': 'Testing Email',
        'body': 'Send help'
    }
    
    resp = client.get(f'/inbox/{message_id}', headers=user_token, json={
        'user_id': user_stub['_id'],
        'message_id': message_id
    })
    assert resp.status_code == conftest.OK
    
    # get message and assert data
    msg = resp.json.copy()
    msg.pop('timestamp')
    assert msg == {
        '_id': str(message_id),
        'sender': str(id),
        'recipient': str(user_stub['_id']),
        'subject': 'Testing Email',
        'body': 'Send help'
    }
    
def test_delete_specific_message(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the ('/inbox/<message_id>') is deleted (DELETE)
    THEN check that a '200' (OK) status code is returned
    """
    id = mock_db['UserAccount'].find_one()['_id']
    user_stub = conftest.USER_STUB.copy()
    mock_db['UserAccount'].insert_one(user_stub)
    
    resp = client.post('/inbox/new', headers=user_token, json={
        'recipient': user_stub['_id'],
        'subject': 'Testing Email',
        'body': 'Send help'
    })
    assert resp.status_code == conftest.OK
    
    # checking that message was pushed into recipient's inbox
    user = mock_db['UserAccount'].find_one({'_id': user_stub['_id']})

    message = user['inbox'][0]
    message_id = message.pop('_id')
    message.pop('timestamp')

    assert message == {
        'sender': id,
        'recipient': ObjectId(user_stub['_id']),
        'subject': 'Testing Email',
        'body': 'Send help'
    }
    
    resp = client.get(f'/inbox/{message_id}', headers=user_token, json={
        'user_id': user_stub['_id'],
        'message_id': message_id
    })
    assert resp.status_code == conftest.OK
    
    # get message and assert data
    msg = resp.json.copy()
    msg.pop('timestamp')
    assert msg == {
        '_id': str(message_id),
        'sender': str(id),
        'recipient': str(user_stub['_id']),
        'subject': 'Testing Email',
        'body': 'Send help'
    }
    
    # delete inbox message
    resp = client.delete(f'/inbox/{message_id}', headers=user_token, json={
        'user_id': user_stub['_id'],
        'message_id': message_id
    })
    assert resp.status_code == conftest.OK
    
    # check inbox and assert message is not there anymore
    user = mock_db['UserAccount'].find_one({'_id': user_stub['_id']})
    assert user['inbox'] == []
    
def test_specific_invalid_user(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the ('/inbox/<message_id>') is (GET) with an invalid user_id
    THEN check that a '200' (OK) status code is returned
    """
    user_stub = conftest.USER_STUB.copy()
    mock_db['UserAccount'].insert_one(user_stub)
    
    resp = client.post('/inbox/new', headers=user_token, json={
        'recipient': user_stub['_id'],
        'subject': 'Testing Email',
        'body': 'Send help'
    })
    assert resp.status_code == conftest.OK
    
    # checking that message was pushed into recipient's inbox
    user = mock_db['UserAccount'].find_one({'_id': user_stub['_id']})

    message = user['inbox'][0]
    message_id = message.pop('_id')
    message.pop('timestamp')
    
    resp = client.get(f'/inbox/{message_id}', headers=user_token, json={
        'user_id': 'invalid!',
        'message_id': message_id
    })
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': 'Invalid user id'
    }
    
def test_specific_missing_user(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the ('/inbox/<message_id>') is (GET) with an missing user_id
    THEN check that a '200' (OK) status code is returned
    """
    user_stub = conftest.USER_STUB.copy()
    mock_db['UserAccount'].insert_one(user_stub)
    
    resp = client.post('/inbox/new', headers=user_token, json={
        'recipient': user_stub['_id'],
        'subject': 'Testing Email',
        'body': 'Send help'
    })
    assert resp.status_code == conftest.OK
    
    # checking that message was pushed into recipient's inbox
    user = mock_db['UserAccount'].find_one({'_id': user_stub['_id']})

    message = user['inbox'][0]
    message_id = message.pop('_id')
    message.pop('timestamp')
    
    resp = client.get(f'/inbox/{message_id}', headers=user_token, json={
        'message_id': message_id
    })
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': 'Invalid user id'
    }

def test_specific_invalid_message(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the ('/inbox/<message_id>') is (GET) with an missing message_id
    THEN check that a '200' (OK) status code is returned
    """
    user_stub = conftest.USER_STUB.copy()
    mock_db['UserAccount'].insert_one(user_stub)
    
    resp = client.post('/inbox/new', headers=user_token, json={
        'recipient': user_stub['_id'],
        'subject': 'Testing Email',
        'body': 'Send help'
    })
    assert resp.status_code == conftest.OK
    
    # checking that message was pushed into recipient's inbox
    user = mock_db['UserAccount'].find_one({'_id': user_stub['_id']})
    
    resp = client.get('/inbox/invalid', headers=user_token, json={
        'user_id': user_stub['_id'],
    })
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': 'Invalid message'
    }

################################### OVERVIEW ###################################
def test_overview_get_success(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the ('/inbox') is requested for (GET)
    THEN check that a '200' (OK) status code is returned
    """
    user = mock_db['UserAccount'].find_one()
    
    id1 = ObjectId()
    id2 = ObjectId()
    id3 = ObjectId()

    mock_db['UserAccount'].update_one(
        { '_id': user['_id'] },
        { '$set': { 'inbox': [id1, id2, id3] } }
    )
    
    resp = client.get('/inbox', headers=user_token, json={})    
    assert resp.status_code == conftest.OK
    assert resp.json == [str(id1), str(id2), str(id3)]
    
def test_overview_delete_success(client, mock_db, user_token):
    """
    GIVEN a Flask application configured for testing
    WHEN the ('/inbox') is requested for (DELETE)
    THEN check that a '200' (OK) status code is returned
    """
    user = mock_db['UserAccount'].find_one()
    
    id1 = ObjectId()
    id2 = ObjectId()
    id3 = ObjectId()

    mock_db['UserAccount'].update_one(
        { '_id': user['_id'] },
        { '$set': { 'inbox': [{'_id': id1}, {'_id': id2}, {'_id': id3}] } }
    )
    
    resp = client.get('/inbox', headers=user_token, json={})    
    assert resp.status_code == conftest.OK
    assert resp.json == [{'_id': str(id1)}, {'_id': str(id2)}, {'_id': str(id3)}]
    
    resp = client.delete('/inbox', headers=user_token, json={
        'message_id': [id1, id2]
    })
    
    resp = client.get('/inbox', headers=user_token, json={})
    assert resp.status_code == conftest.OK
    assert resp.json == [{'_id': str(id3)}]
    
def test_overview_invalid_message_id(client, user_token):
    """
    GIVEN a Flask environment configured for testing
    WHEN the '/inbox' is requested for (GET) with an invalid message_id
    THEN check that a '400' (BAD_REQUEST) status code is returned 
    """ 
    resp = client.get('/inbox', headers=user_token, json={
        'message_id': ['invalid!']
    })
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': 'Invalid message'
    }
    
def test_overview_invalid_user_id(client):
    """
    GIVEN a Flask environment configured for testing
    WHEN the '/inbox' is requested for (GET) with an invalid token
    THEN check that a '401' (UNAUTHORIZED) status code is returned 
    """
    resp = client.get('/inbox', headers={"Authorization": "invalid"}, json={})
    assert resp.status_code == conftest.UNAUTHORIZED

def test_overview_delete_invalid_message(client, user_token):
    """
    GIVEN a Flask environment configured for testing
    WHEN the '/inbox' is requested for (DELETE) with no selected messages
    THEN check that a '400' (BAD_REQUEST) status code is returned 
    """
    resp = client.delete('/inbox', headers=user_token, json={
        'empty': 'empty'
    })
    assert resp.status_code == conftest.BAD_REQUEST
    assert resp.json == {
        'error': 'Messages must be selected' 
    }
