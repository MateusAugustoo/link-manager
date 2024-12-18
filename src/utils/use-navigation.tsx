import { useNavigate } from 'react-router'

export const useNavigation = ({ route }: { route: string }) => {
  const navigate = useNavigate()

  return () => navigate(route)
}