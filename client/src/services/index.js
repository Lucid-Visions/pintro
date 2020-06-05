export const createCommunity = async formData => {
    await fetch(`http://${env.host}:${env.port}/api/v1/community`, { method: 'POST'});
}