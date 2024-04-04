import { useEffect } from "react";
import { useAppDispatch, useAppSelecter } from "../../store/slices/hooks";
import { RootState } from "../../store/store";
import { clearError, deleteContact, getAllContact } from "../../store/slices/contactSlice";
import { Loading } from "../../components/loading";
import { Link } from "react-router-dom";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

export const Homepage = () => {
  const contact = useAppSelecter((state: RootState) => state.contact);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllContact());
  }, []);

  useEffect(() => {
    if (contact.error?.length) {
      Swal.fire({
        title: 'Error',
        text: contact.error,
        icon: 'error',
        confirmButtonText: 'Close',
        allowEscapeKey: false,
        allowOutsideClick: false,
      }).then((res) => {
        if (res.isConfirmed) {
          dispatch(clearError());
        }
      });
    }
  }, [contact.error]);

  return (
    <main className="relative z-0" data-testid='homepage'>
      <h1>Contact List</h1>
      <div>
        { contact.loading ?
          <div className="flex flex-col items-center mt-4">
            <Loading />
            <h2 className="mt-4">Loading contact data...</h2>
          </div> :
          <div className="relative overflow-x-auto">
            <table data-testid='homepage-table' className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
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
                          { item.firstName }
                        </td>
                        <td className="p-4">
                          { item.lastName }
                        </td>
                        <td className="p-4">
                          { item.age }
                        </td>
                        <td className="p-4 flex justify-center">
                          <img style={ { width: '50px', height: '50px' } } src={ item.photo } alt={ `${ item.firstName }'s avatar` } />
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-8">
                            <button onClick={ () => {
                              Swal.fire({
                                title: 'Contact Detail',
                                html: `
                                <div class="flex flex-col items-center">
                                    <img src=${ item.photo } alt='error fetching image' />
                                    <h3>${ item.firstName } ${ item.lastName }</h3>
                                    <p>${ item.age } ${ parseInt(item.age) > 1 ? 'years' : 'year' } old</p>
                                </div>
                                `
                              });
                            } }><EyeIcon className="h-4 w-4" /></button>
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