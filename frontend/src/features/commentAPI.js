import axios from 'axios';

export async function fetchComments() {
  return await axios.get('http://localhost:8081/api/comment')
}

export async function fetchData() {
  const result = await axios.get('http://localhost:8081/api/comments')
  console.log('result', result);
  console.log('result.data', result.data);
  console.log('result.data.data', result.data.data);
  let coments = {}
      result.data.data.forEach(comment => {
        const childCommments = comment.childCommments.split(',').filter(element => element !== '');
        var isRootNode = (comment.isRootNode === 'true');
        let comentario = {...comment, childCommments, isRootNode}
        console.log('comentario', comentario)
        coments[comment.id] = comentario
      });
  return result.data.data
};