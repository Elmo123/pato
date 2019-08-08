import Data from '../models/defineData';

export const index = (req, res, next) => {
  Data.find().lean().exec((err, data) => res.json(
    { data: data[0]}
  ));
};