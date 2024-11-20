import { useState, useEffect } from 'react';
import { Form, Button, Card, InputGroup, Image, Alert } from 'react-bootstrap';
import axios from '../config/axios';
import DefaultLayout from '../components/DefaultLayout';
import ProductForm from './user-adding/Add_Product_Form'
import MainTableDisplay from './user-adding/MainTableDisplay';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ file: null });
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUserData();
    fetchProfileImage();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/users/account', {headers:{'Authorization': localStorage.getItem('token')}});
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data.')
    }
  };

  const fetchProfileImage = async () => {
    try {
      const response = await axios.get('/api/users/show-photo',{ headers:{'Authorization': localStorage.getItem('token')}});
      if (response.data && response.data.file) {
        setProfilePhoto(response.data);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
      setError('Failed to load profile image.')
    }
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    if (updatedProfile.file) {
      formData.append('file', updatedProfile.file);
    }

    try {
      setLoading(true);
      const response = await axios.put('/api/users/update-photo', formData, {headers:{'Authorization': localStorage.getItem('token'),}});
      if (response.data && response.data.profile) {
        setUser(response.data.profile);
        setProfilePhoto(response.data.profile)
        setEditMode(false)
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile.')
    } finally {
      setLoading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setUpdatedProfile((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  // Get the URL for displaying the photo
  const getPhotoUrl = () => {
    if (profilePhoto && profilePhoto.file) {
      return profilePhoto.file //Profile photo upload
    }
    return 'https://via.placeholder.com/150'; // Default placeholder if no photo
  };


  const handleRemovePhoto = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your profile photo?");
    if (!confirmed) {
      return; // Exit if the user cancels
    }
    try {
      setLoading(true);
      const response = await axios.delete('/api/users/delete-photo', {headers:{'Authorization': localStorage.getItem('token')}});

      if (response.data && response.data.profile) {
        setUser(response.data.profile);
        setProfilePhoto(null)
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error removing profile photo:', error);
      setError('Failed to remove profile photo.')
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
    <div className="container mt-4">
      {error && <Alert variant="danger">{error}</Alert>}
      <Card>
        <Card.Body className="text-center">
          <div>
            <Image
              src={getPhotoUrl()}
              roundedCircle
              width={150}
              height={150}
              alt="Profile"
              className="mb-3"
              style={{ objectFit: 'cover', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
            />
          </div>
          <h4><i>{user.username}</i></h4>
          <p><strong>Email:</strong>{user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <Button variant="primary" onClick={() => setEditMode(true)} className="me-2">
            Update Picture
          </Button>
          <Button variant="danger" onClick={handleRemovePhoto} disabled={loading}>
           Delete Picture
          </Button>
        </Card.Body>
      </Card>

      {editMode && (
        <Card className="mt-4">
          <Card.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProfile();
              }}
            >
              <Form.Group className="mb-3" controlId="profilePhoto">
                <Form.Label>Profile Photo</Form.Label>
                <InputGroup>
                  <Form.Control type="file" onChange={handleFileChange} />
                </InputGroup>
              </Form.Group>

              <Button variant="success" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Photo'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
    <hr/>
      <ProductForm/>
      <hr/>
      <MainTableDisplay/>
    </DefaultLayout>
  )
}

export default ProfilePage;
