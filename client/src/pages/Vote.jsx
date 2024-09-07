import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { candidates } from '../../store/profile/profileAuth';
import Modal from '../components/Model';
import { vote } from '../../store/candidate/candidateAction';

const Vote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const {
    candidates: candidateList,
    loading,
    error,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(candidates());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  // Images for each candidate
  const profileImages = {
    '66d8614ce028e3c4d74b8f22':
      'https://www.pmindia.gov.in/wp-content/uploads/2022/12/twitter_3.jpg',
    '66d863cbad0bfff90bf59c79':
      'https://indianexpress.com/wp-content/uploads/2023/10/Rahul-gandhi-profile-800.jpg',
    '66d86417ad0bfff90bf59c7c':
      'https://images.assettype.com/outlookindia/2024-04/9f8a5b21-b673-4591-93ea-8432de8466f9/Akhilesh_Yadav_CMO.jpg',
  };

  const handleVoteClick = (candidate) => {
    setSelectedCandidate({
      ...candidate,
      image: profileImages[candidate._id] || '/default-image.png',
    });
    setShowModal(true);
  };

  const handleConfirmVote = () => {
    if (selectedCandidate) {
      console.log(selectedCandidate._id, 'ja');
      dispatch(vote({ candidateID: selectedCandidate._id }));
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-blue-800">
          Cast Your Vote for Your Favorite Candidate
        </h1>
        {candidateList.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {candidateList.map((candidate) => (
              <div
                key={candidate._id}
                className="relative bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl  transform hover:scale-105 transition-transform duration-500 ease-in-out w-full sm:w-80 md:w-96 lg:w-1/4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 opacity-30 rounded-xl z-0"></div>
                <div className="relative flex flex-col items-center mb-6 z-10">
                  <img
                    src={profileImages[candidate._id] || '/default-image.png'}
                    alt={candidate.name}
                    className="w-48 h-48 object-cover rounded-full border-4 border-blue-800 shadow-xl"
                  />
                  <div className="text-center mt-6">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                      {candidate.name}
                    </h2>
                    <p className="text-gray-800 mb-1">
                      <span className="font-semibold text-blue-700">
                        Party:
                      </span>{' '}
                      {candidate.party}
                    </p>
                    <p className="text-gray-800 mb-1">
                      <span className="font-semibold text-blue-700">Age:</span>{' '}
                      {candidate.age}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-semibold text-blue-700">
                        Votes:
                      </span>{' '}
                      {candidate.voteCount}
                    </p>
                  </div>
                </div>
                <button
                  className="relative z-20 w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                  onClick={() => handleVoteClick(candidate)}
                >
                  Vote Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-2xl text-gray-700">
            No candidates available
          </p>
        )}
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmVote}
          candidate={selectedCandidate}
        />
      </div>
    </div>
  );
};

export default Vote;
