"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Bell,
  Shield,
  Database,
  Truck,
  Check,
  X,
  SignOut,
} from "@phosphor-icons/react";

export default function ParametresPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    // Afficher le dialogue de confirmation
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    // Fermer le dialogue
    setShowLogoutDialog(false);
    // Activer l'état de chargement
    setIsLoggingOut(true);

    // Simuler un délai de chargement
    setTimeout(() => {
      // Rediriger vers la page d'accueil
      router.push("/");
      setIsLoggingOut(false);
    }, 1500);
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Veuillez remplir tous les champs");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    // Simuler le changement de mot de passe
    setPasswordSuccess("Mot de passe modifié avec succès");
    setPasswordError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => setPasswordSuccess(""), 3000);
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="relative">
        <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title="Paramètres"
          description="Gérez les paramètres de votre application Carbivio"
          showControls={false}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 max-w-400 mx-auto">
            {/* Le titre et la description sont maintenant gérés par le header */}

            {/* Paramètres des notifications */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full border-2 border-dashed border-primary">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-card-foreground">
                      Notifications
                    </CardTitle>
                    <CardDescription>
                      Gérez les alertes et notifications
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertes de stock bas</Label>
                    <p className="text-sm text-muted-foreground">
                      Soyez notifié quand le stock est inférieur à 20%
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Nouvelles commandes</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez une notification pour chaque nouvelle commande
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Livraisons en retard</Label>
                    <p className="text-sm text-muted-foreground">
                      Alertes lorsque les livraisons sont en retard
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Rapports mensuels</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez un résumé mensuel des performances
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Paramètres de sécurité */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full border-2 border-dashed border-primary">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-card-foreground">
                      Sécurité
                    </CardTitle>
                    <CardDescription>
                      Paramètres de sécurité et d'authentification
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session automatique</Label>
                    <p className="text-sm text-muted-foreground">
                      Déconnexion après 30 minutes d'inactivité
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Authentification renforcée</Label>
                    <p className="text-sm text-muted-foreground">
                      Vérification supplémentaire pour les actions sensibles
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-4">
                  <Label>Changer le mot de passe</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      type="password"
                      placeholder="Mot de passe actuel"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-secondary border-border"
                    />
                    <Input
                      type="password"
                      placeholder="Nouveau mot de passe"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-secondary border-border"
                    />
                    <Input
                      type="password"
                      placeholder="Confirmer le mot de passe"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-secondary border-border"
                    />
                  </div>

                  {passwordError && (
                    <div className="flex items-center gap-2 text-destructive">
                      <X className="w-4 h-4" />
                      <span className="text-sm">{passwordError}</span>
                    </div>
                  )}

                  {passwordSuccess && (
                    <div className="flex items-center gap-2 text-primary">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">{passwordSuccess}</span>
                    </div>
                  )}

                  <Button
                    onClick={handlePasswordChange}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Mettre à jour le mot de passe
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Paramètres des opérations */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full border-2 border-dashed border-primary">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-card-foreground">
                      Opérations
                    </CardTitle>
                    <CardDescription>
                      Paramètres liés aux opérations carburant
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alerte carburant critique</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifier quand le stock est inférieur à 15%
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Suivi GPS des livraisons</Label>
                    <p className="text-sm text-muted-foreground">
                      Activer le suivi en temps réel des camions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Validation automatique</Label>
                    <p className="text-sm text-muted-foreground">
                      Valider automatiquement les commandes récurrentes
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label>Seuil d'alerte de stock</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      defaultValue="20"
                      className="w-20 bg-secondary border-border"
                    />
                    <span className="text-sm text-muted-foreground">
                      % du stock total
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Paramètres de sauvegarde */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full border-2 border-dashed border-primary">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-card-foreground">
                      Sauvegarde
                    </CardTitle>
                    <CardDescription>
                      Gestion des sauvegardes et exportation
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sauvegarde automatique</Label>
                    <p className="text-sm text-muted-foreground">
                      Sauvegarde quotidienne à 23:00
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dernière sauvegarde</Label>
                    <p className="text-sm text-muted-foreground">
                      9 avril 2026 à 23:00
                    </p>
                  </div>
                  <Badge variant="secondary">À jour</Badge>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="border-border">
                    Exporter les données
                  </Button>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Sauvegarder maintenant
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Enregistrer les modifications
              </Button>
              <Button variant="outline" className="border-border">
                Réinitialiser
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <SignOut className="w-4 h-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Afficher le composant de chargement pendant la déconnexion */}
      {isLoggingOut && <LoadingSpinner message="Déconnexion en cours..." />}

      {/* Dialogue de confirmation pour la déconnexion */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
        title="Confirmation de déconnexion"
        message="Êtes-vous sûr de vouloir vous déconnecter ?"
        confirmText="Se déconnecter"
        cancelText="Annuler"
      />
    </div>
  );
}
