import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelecter } from "../../store/slices/hooks";
import { getContactDetail } from "../../store/slices/detailContactSlice";
import { RootState } from "../../store/store";
import { IdParams } from "../../types";
import { Loading } from "../../components/loading";
import { postContact, putContact } from "../../store/slices/contactSlice";
import Swal from "sweetalert2";

type DataFormType = {
  firstName: string,
  lastName: string,
  age: string,
};

export const CreateContact = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const detail = useAppSelecter((state: RootState) => state.detail);
  const contact = useAppSelecter((state: RootState) => state.contact);
  const params = useParams<IdParams>();
  useEffect(() => {
    if (params.id?.length) {
      dispatch(getContactDetail(params.id));
    }
  }, []);

  const [preview, setPreview] = useState<string | undefined>('');
  const [dataForm, setDataForm] = useState<DataFormType>({
    age: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (params.id?.length) {
      setDataForm({
        age: detail.data.age?.toString(),
        firstName: detail.data.firstName,
        lastName: detail.data.lastName,
      });
      setPreview(detail.data.photo);
    } else {
      setDataForm({
        age: '',
        firstName: '',
        lastName: ''
      });
      setPreview('');
    }
  }, [detail.data, params.id?.length]);

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataForm(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.dataTransfer.files.length && e.dataTransfer.files[0].type.includes('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(e.dataTransfer.files[0]);
      reader.onload = () => {
        setPreview(reader.result?.toString());
      };
    }
  };

  const onChangeFileForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setPreview(reader.result?.toString());
      };
    }
  };

  const handleSubmission = () => {
    if (preview?.length) {
      if (params.id?.length) {
        dispatch(putContact({
          id: params?.id,
          body: {
            age: parseInt(dataForm.age),
            firstName: dataForm.firstName,
            lastName: dataForm.lastName,
            photo: preview
          }
        }));
      } else {
        dispatch(postContact({
          age: parseInt(dataForm.age),
          firstName: dataForm.firstName,
          lastName: dataForm.lastName,
          photo: preview
        }));
      }
    }
  };

  useEffect(() => {
    if (contact.message?.includes('Successfully')) {
      Swal.fire({
        title: 'Success',
        text: contact.message,
        icon: 'success',
        confirmButtonText: 'Proceed',
        allowEscapeKey: false,
        allowOutsideClick: false,
      }).then((res) => {
        if (res.isConfirmed) {
          navigate('/');
        }
      });
    }
  });

  const validSubmission = dataForm.age && dataForm.firstName.length && dataForm.lastName && preview?.length;

  return (
    <main className="p-4" data-testid='create-contact'>
      <h1>{ params.id?.length ? 'Edit' : 'Create' } Contact</h1>
      <div className="flex justify-center items-center">
        {
          detail.loading || contact.loading ?
            <Loading /> :
            <form className="flex flex-col mt-4" data-testid='create-contact-form'>
              <label htmlFor="firstName" className="mr-4">First Name</label>
              <input className="mb-4 pl-2" id="firstName" type="text" value={ dataForm.firstName } onChange={ e => onChangeForm(e) } />
              <label htmlFor="lastName" className="mr-4">Last Name</label>
              <input className="mb-4 pl-2" id="lastName" type="text" value={ dataForm.lastName } onChange={ e => onChangeForm(e) } />
              <label htmlFor="age" className="mr-4">Age</label>
              <input className="mb-4 pl-2" id="age" type="number" value={ dataForm.age } onChange={ e => onChangeForm(e) } />

              { preview?.length ?
                <div className="flex flex-col items-center">
                  <p>Preview Image</p>
                  <div className="w-9/12">
                    <p className="text-2xl absolute font-bold text-red-600 cursor-pointer" onClick={ () => setPreview('') }>X</p>
                    <img className="w-full" src={ preview } alt="image not valid" />
                  </div>
                </div> : <div className="relative z-10 min-h-32 flex items-center border-2 border-black border-dashed p-16 cursor-pointer" onDrop={ (e) => handleDrop(e) } onDragOver={ (e) => handleDragOver(e) }>
                  <label className="relative z-0 cursor-pointer text-sm" htmlFor="photo">Drag file or click here to upload image</label>
                  <input type="file" id="photo" className="hidden" onChange={ onChangeFileForm } />
                </div>
              }
              <button className="mt-4" disabled={ !validSubmission } onClick={ (e) => {
                e.preventDefault();
                handleSubmission();
              } }>Submit</button>
            </form>
        }
      </div>
    </main>
  );
};