import{isAuthenticated}from"../_lib";export async function GET(){return Response.json({authenticated:await isAuthenticated()})}
