import Data from '../models/defineData';
//import moment from 'moment';

export const index = (req, res, next) => {
  Data.find().lean().exec((err, data) => res.json(
    { data: data.map(data_ => ({
      ...data_,
    }))}
  ));
};