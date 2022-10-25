useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:8081/api/comments')
      console.log(result);
      console.log(result.data);
      console.log(result.data.data);
      let coments = {}
      result.data.data.forEach(comment => {
        const childCommments = comment.childCommments.split(',').filter(element => element !== '');
        var isRootNode = (comment.isRootNode === 'true');
        let comentario = {...comment, childCommments, isRootNode}
        console.log('comentario', comentario)
        coments[comment.id] = comentario
      });
      console.log(coments)
      setEnhancedComments([
        ...Object.values(coments).filter((comment) => {
          return !comment.parentNodeId;
        }).map(commentMapper)]);
      setComments({...coments})
      
    };
    fetchData();
  }, []);




  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:8081/api/comments')
      console.log(result);
      console.log(result.data);
      console.log(result.data.data);
      let coments = {}
      result.data.data.forEach(comment => {
        const childCommments = comment.childCommments.split(',').filter(element => element !== '');
        var isRootNode = (comment.isRootNode === 'true');
        let comentario = {...comment, childCommments, isRootNode}
        console.log('comentario', comentario)
        coments[comment.id] = comentario
      });
      console.log(coments)
      setComments(coments)
    };
    fetchData();
  }, []);