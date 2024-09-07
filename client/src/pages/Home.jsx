/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../../store/profile/profileAuth';
import { Spinner } from 'flowbite-react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <Spinner color="purple" aria-label="Loading" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="flex items-center p-8 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white">
            <FaUserCircle size={90} className="text-gray-200" />
            <div className="ml-8">
              <h1 className="text-6xl font-extrabold leading-tight">
                {profile?.user.name}
              </h1>
              <p className="text-xl font-medium mt-2">{profile?.user.email}</p>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-4xl font-semibold text-gray-800 mb-5">
                  Details
                </h2>
                <ul className="space-y-4">
                  {[
                    { label: 'Age', value: profile?.user.age },
                    { label: 'Mobile', value: profile?.user.mobile },
                    { label: 'Address', value: profile?.user.address },
                    {
                      label: 'Aadhaar Number',
                      value: profile?.user.adharCardNumber,
                    },
                    { label: 'Role', value: profile?.user.role },
                  ].map(({ label, value }) => (
                    <li key={label} className="text-gray-700 flex items-center">
                      <span className="font-semibold w-40 text-gray-600">
                        {label}:
                      </span>{' '}
                      {value}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-4xl font-semibold text-gray-800 mb-5">
                  Additional Info
                </h2>
                <p className="text-gray-700">
                  Curabitur pretium tincidunt lacus. Cras dolor mauris,
                  malesuada in ornare ac, tristique ac nunc. Sed vestibulum,
                  eros non facilisis ultricies, mauris nulla scelerisque purus,
                  sit amet lacinia ligula arcu at nisi.
                </p>
              </motion.div>
            </div>
            <div className="mt-10 flex justify-center">
              {profile?.user.isvoted ? (
                <motion.div
                  className="bg-green-50 p-6 rounded-lg border border-green-200 text-green-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-2xl font-semibold">
                    You have already voted!
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col items-center mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-2xl font-semibold mb-4">
                    You haven't voted yet. Do you want to vote?
                  </p>
                  <button className="bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105">
                    <Link to="/vote">Vote Now</Link>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
