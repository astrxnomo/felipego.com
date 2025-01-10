import Card from "@/components/card"
import SocialLinks from "@/components/social-links"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function Footer() {
  return (
    <footer>
      <Card>
        <div className="flex justify-between">
          <SocialLinks />
          <ThemeSwitcher />
        </div>
      </Card>
    </footer>
  )
}
