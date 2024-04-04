import { useEffect } from "react";
import { useAppDispatch, useAppSelecter } from "../../store/slices/hooks";
import { RootState } from "../../store/store";
import { deleteContact, getAllContact } from "../../store/slices/contactSlice";
import { Loading } from "../../components/loading";
import { Link } from "react-router-dom";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";

export const Homepage = () => {
  const contact = useAppSelecter((state: RootState) => state.contact);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllContact());
  }, []);

  return (
    <main className="relative z-0">
      <h1>Contact List</h1>
      <div>
        { contact.loading ?
          <div className="flex justify-center items-center mt-4">
            <Loading />
          </div> :
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    First Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Last Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Photo
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  contact.data.map((item, index) => {
                    return (
                      <tr key={ item.id } className={ `text-center ${ (index + 1) % 2 === 0 ? 'bg-white' : 'bg-[#BEE9E8]' } hover:bg-[#5FA8D3] hover:text-black border-b dark:bg-gray-800 dark:border-gray-700` }>
                        <td className="p-4">
                          { item.id }
                        </td>
                        <td className="p-4">
                          { item.firstName }
                        </td>
                        <td className="p-4">
                          { item.lastName }
                        </td>
                        <td className="p-4">
                          { item.age }
                        </td>
                        <td className="p-4">
                          <img style={{width:'200px', height:'200px'}} src={ item.photo } alt={ `${ item.firstName }'s avatar` } />
                        </td>
                        <td className="p-4">
                          <div className="flex gap-8">
                            <Link to={ `/detail/${ item.id }` }> <button><EyeIcon className="h-4 w-4" /></button></Link>
                            <Link to={ `/edit/${ item.id }` }> <button><PencilIcon className="h-4 w-4" /></button></Link>
                            <button onClick={ (e) => {
                              e.preventDefault();
                              dispatch(deleteContact(item.id));
                            } }><TrashIcon className="h-4 w-4" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div> }
      </div>
    </main>
  );
};