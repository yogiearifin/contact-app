import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IdParams } from "../../types";
import { useAppDispatch, useAppSelecter } from "../../store/slices/hooks";
import { getContactDetail } from "../../store/slices/detailContactSlice";
import { Loading } from "../../components/loading";

export const DetailContact = () => {
  const params = useParams<IdParams>();
  const detail = useAppSelecter((state) => state.detail);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (params.id?.length) {
      dispatch(getContactDetail(params.id));
    }
  }, []);

  const navigate = useNavigate();

  return (
    <main>
      <h1>Detail Contact</h1>
      <div className="flex justify-center items-center p-8">
        { detail.loading ? <Loading /> :
          <div className="flex flex-col">
            <img className="rounded-md" src={ detail.data.photo } alt={ `${ detail.data.firstName }'s avatar` } />
            <p className="text-3xl">{ detail.data.firstName } { detail.data.lastName }</p>
            <p className="text-2xl">{ detail.data.age } { detail.data.age && parseInt(detail.data.age) > 1 ? 'years' : 'year' } old</p>
            <p className="text-nowrap">ID:{ detail.data.id }</p>
            <button onClick={ () => navigate(-1) } className="mt-4">Back</button>
          </div>
        }
      </div>
    </main>
  );
};