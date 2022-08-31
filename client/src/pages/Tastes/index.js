import { GET_ME } from "../../utils/queries";
import { useQuery, useMutation } from '@apollo/client';
const Tastes = () => {
    // use useQuery hook to make query request
    const { loading, data } = useQuery(GET_ME);
  
    return (
      <main>
        <div className='flex-row justify-space-between'>
          <div className='col-12 mb-3'>{/* PRINT THOUGHT LIST */}</div>
        </div>
      </main>
    );
  };

export default Tastes;