import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Edit, MapPin, Calendar, Link as LinkIcon } from "lucide-react";
import { api } from "~/trpc/server";

// server component = component yang di render di server kita (VPS/Hosting)
// client component = component yang di render di client kita (browser)

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username: inputUsername } = await params;
  const profile = await api.user.getProfileByUsername({
    username: inputUsername,
  });

  return (
    <main>
      <div className="flex flex-col gap-6">
        {/* Kartu profil utama */}
        <Card className="overflow-hidden">
          {/* Bagian header dengan background gradient */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

          <CardContent className="relative pt-0">
            {/* Avatar diposisikan di atas header */}
            <div className="-mt-12 mb-4 flex justify-center">
              <Avatar className="border-background size-24 border-4">
                <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-xl text-white">
                  {profile.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
                <AvatarImage src={profile.image ?? ""} />
              </Avatar>
            </div>

            {/* Informasi profil */}
            <div className="mb-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{profile.name}</p>
                </div>
                <p className="text-muted-foreground">@{profile.username}</p>
                <p className="text-muted-foreground">{profile.email}</p>

                {/* Bio dan info tambahan */}
                <p className="mt-2 max-w-md">
                  Passionate about technology, design, and creating amazing user
                  experiences.
                </p>

                <div className="text-muted-foreground mt-3 flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>Jakarta, Indonesia</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Joined March 2023</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon size={14} />
                    <span className="cursor-pointer text-blue-500 hover:underline">
                      ferren.dev
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistik */}
            <div className="flex justify-center border-t pt-4">
              <div className="flex gap-8 text-center">
                <div>
                  <p className="text-lg font-bold">128</p>
                  <p className="text-muted-foreground text-sm">Posts</p>
                </div>
                <div>
                  <p className="text-lg font-bold">1.2K</p>
                  <p className="text-muted-foreground text-sm">Followers</p>
                </div>
                <div>
                  <p className="text-lg font-bold">356</p>
                  <p className="text-muted-foreground text-sm">Following</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kartu tambahan untuk informasi lainnya */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Software engineer with 5+ years of experience. Specialized in
                frontend development and user interface design. Love to
                collaborate on open-source projects.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">UI/UX Design</Badge>
                <Badge variant="outline">Next.js</Badge>
                <Badge variant="outline">Tailwind CSS</Badge>
                <Badge variant="outline">Figma</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
