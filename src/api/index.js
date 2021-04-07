import request from '../network/request';

export const fetchData = completeState => {
  return request({
    url: '/api/display/goodOrder',
    method: 'post',
    params: {completeState}
  });
};
export const errData = query => {
  return request({
    url: '/api/errorOrder/showAll',
    method: 'post',
    params: query
  });
};

// export const fetchData = query => {
//   return request({
//     url: './table.json',
//     method: 'get',
//     params: query
//   });
// };
